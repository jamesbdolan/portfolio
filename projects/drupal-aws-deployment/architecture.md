# 🏗️ APM Architecture Overview

```mermaid
graph TB
    subgraph "🌐 External Access"
        USER[👤 User<br/>localhost:8080]
        PROM_UI[📊 Prometheus UI<br/>localhost:9090]
        GRAF_UI[📈 Grafana UI<br/>localhost:3000<br/>admin/SuperSecretPass123]
        LOKI_UI[📝 Loki UI<br/>via Grafana Explore]
    end

    subgraph "🐳 Docker Containers"
        subgraph "🖥️ Drupal Container (drupal:80)"
            APACHE[🌐 Apache Web Server<br/>+ mod_php]
            DRUPAL[🏠 Drupal Application]
            METRICS[📊 prom-metrics.php<br/>Custom Metrics Endpoint]
            STATUS[📋 /server-status<br/>Apache Status]
            LOGS_VOL[📁 /var/log/apache2/<br/>Shared Volume]

            APACHE --> DRUPAL
            APACHE --> METRICS
            APACHE --> LOGS_VOL
        end

        subgraph "📝 Log Sidecar Containers"
            ACCESS_LOGS[📊 access-logs<br/>Sidecar Container]
            ERROR_LOGS[🚨 error-logs<br/>Sidecar Container]
        end

        subgraph "🗄️ Database Container (db:3306)"
            MYSQL[🐬 MariaDB Database]
        end

        subgraph "📊 MySQL Exporter (mysql-exporter:9104)"
            MYSQL_EXP[📈 MySQL Metrics<br/>Connection, Performance,<br/>Query Stats]
        end

        subgraph "🔍 Prometheus (prometheus:9090)"
            PROM[📊 Prometheus Server<br/>Metrics Collection<br/>& Storage]
        end

        subgraph "📝 Loki Stack"
            LOKI[📝 Loki Server<br/>Log Storage & Indexing<br/>:3100]
            PROMTAIL[🔄 Promtail<br/>Log Collector<br/>:9080]
        end

        subgraph "📈 Grafana (grafana:3000)"
            GRAF[📊 Grafana Dashboards<br/>Metrics + Logs<br/>Visualization & Alerting]
        end
    end

    %% Data Flow - Metrics Generation
    MYSQL -.->|"📊 DB Metrics"| MYSQL_EXP
    DRUPAL -.->|"📊 App Metrics"| METRICS
    APACHE -.->|"📊 Web Metrics"| STATUS
    STATUS -.->|"📊 Web Metrics"| METRICS

    %% Data Flow - Log Generation
    LOGS_VOL -.->|"📊 Access Logs"| ACCESS_LOGS
    LOGS_VOL -.->|"🚨 Error Logs"| ERROR_LOGS
    DRUPAL -.->|"📝 App Logs"| PROMTAIL

    %% Data Flow - Metrics Collection
    MYSQL_EXP -->|"🔄 /metrics<br/>:9104"| PROM
    METRICS -->|"🔄 /prom-metrics.php<br/>:80"| PROM

    %% Data Flow - Log Collection
    ACCESS_LOGS -->|"📊 HTTP Logs<br/>Docker Socket"| PROMTAIL
    ERROR_LOGS -->|"🚨 Error Logs<br/>Docker Socket"| PROMTAIL
    PROMTAIL -->|"📝 Structured Logs<br/>:3100"| LOKI

    %% Data Flow - Visualization
    PROM -->|"📊 PromQL Queries"| GRAF
    LOKI -->|"📝 LogQL Queries"| GRAF

    %% User Access
    USER --> APACHE
    USER --> PROM_UI
    USER --> GRAF_UI
    USER --> LOKI_UI
    PROM_UI --> PROM
    GRAF_UI --> GRAF
    LOKI_UI --> GRAF

    %% Database Connection
    DRUPAL <-->|"🔗 PDO Connection"| MYSQL
    MYSQL_EXP <-->|"🔗 MySQL Connection"| MYSQL

    %% Styling
    classDef container fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef metrics fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef logs fill:#fff8e1,stroke:#f57f17,stroke-width:2px
    classDef ui fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    classDef database fill:#fff3e0,stroke:#e65100,stroke-width:2px

    class APACHE,DRUPAL,PROM,GRAF,MYSQL_EXP container
    class METRICS,STATUS,MYSQL_EXP metrics
    class LOKI,PROMTAIL,ACCESS_LOGS,ERROR_LOGS,LOGS_VOL logs
    class USER,PROM_UI,GRAF_UI,LOKI_UI ui
    class MYSQL database
```

## 📊 Metrics & Logs Endpoints Summary

### 📊 Prometheus Metrics
| 🎯 **Endpoint** | 🏠 **Location** | 📊 **Metrics Provided** | 🔄 **Scraped By** |
|----------------|----------------|------------------------|-------------------|
| 📊 `/prom-metrics.php` | `drupal:80` | 🐘 PHP Config, 🏠 Drupal App, 🗄️ Database Health, 🌐 Apache Stats, 📈 Memory per Request | 📊 Prometheus |
| 📈 `/metrics` | `mysql-exporter:9104` | 🐬 MySQL Performance, Connections, Queries | 📊 Prometheus |
| 📋 `/server-status` | `drupal:80` | 🌐 Apache Requests, Workers, Load | 📊 prom-metrics.php |

### 📝 Loki Log Sources
| 🎯 **Log Source** | 🏠 **Location** | 📝 **Log Data** | 🔄 **Collected By** |
|----------------|----------------|------------------------|-------------------|
| 📊 `access-logs` | `access-logs` sidecar | 🌐 HTTP Requests, Status Codes, Response Times, URLs | 🔄 Promtail |
| 🚨 `error-logs` | `error-logs` sidecar | 🚨 Apache Errors, Log Levels, Error Messages | 🔄 Promtail |
| 🏠 `drupal` | `drupal:80` container | 📝 Drupal Application Logs, PHP Errors | 🔄 Promtail |

## ⏱️ Scraping & Execution Frequency

### 📊 Prometheus Metrics Collection
| 🔄 **Component** | ⏰ **Frequency** | 📊 **What Happens** | 💾 **Data Volume** | ⚡ **Performance Impact** |
|-----------------|-----------------|-------------------|-------------------|-------------------------|
| **Prometheus → prom-metrics.php** | Every 15s | Full PHP script execution | ~50 metrics | Low - lightweight script |
| **prom-metrics.php → server-status** | Every 15s | HTTP request to localhost | ~10 Apache metrics | Very Low - local request |
| **prom-metrics.php → Database** | Every 15s | 6 SQL queries (nodes, users, errors) | ~6 metrics | Low - simple COUNT queries |
| **Prometheus → mysql-exporter** | Every 15s | MySQL connection + metrics query | ~100+ MySQL metrics | Medium - full DB stats |

### 📝 Loki Log Collection
| 🔄 **Component** | ⏰ **Frequency** | 📝 **What Happens** | 💾 **Data Volume** | ⚡ **Performance Impact** |
|-----------------|-----------------|-------------------|-------------------|-------------------------|
| **Promtail → access-logs** | Real-time | Docker socket log streaming | All HTTP requests | Very Low - streaming |
| **Promtail → error-logs** | Real-time | Docker socket log streaming | Apache errors only | Very Low - streaming |
| **Promtail → drupal** | Real-time | Docker socket log streaming | Drupal app logs | Very Low - streaming |
| **Promtail → Loki** | Real-time | Structured log ingestion | Parsed + labeled logs | Low - efficient protocol |

### 📈 HTTP Status Code & Response Time Processing

**Via Loki (Real-time):**
- **Log Streaming**: Real-time via Docker socket (no file I/O)
- **Parsing**: Promtail regex extracts status codes, response times, URLs, methods
- **Storage**: Structured logs with labels in Loki
- **Queries**: `{job="access-logs", status="500"}` for instant filtering
- **Performance**: Zero impact on application - pure log streaming

**Benefits over file parsing:**
- ✅ Real-time data (not 15s delayed)
- ✅ All requests captured (not just last 1000)
- ✅ Zero application performance impact
- ✅ Rich querying with LogQL

## 🔄 Data Flow

1. **📊 Metrics Generation**:
   - 🐘 **PHP/Drupal**: Custom `prom-metrics.php` generates comprehensive application metrics
   - 🐬 **MySQL**: Dedicated exporter connects to database and exposes performance metrics
   - 🌐 **Apache**: Status module + access logs provide web server metrics, consumed by `prom-metrics.php`

2. **🔍 Metrics Collection**:
   - 📊 **Prometheus** scrapes all endpoints every 15 seconds
   - 💾 **Storage**: Time-series data stored in Prometheus TSDB
   - 🎯 **Targets**: All endpoints monitored via `/targets` page

3. **📈 Visualization**:
   - 📊 **Grafana** queries Prometheus using PromQL
   - 📋 **Dashboards**: Real-time visualization of all metrics
   - 🚨 **Alerting**: Can be configured for threshold-based alerts

## PHP-FPM vs Apache Architecture

```mermaid
flowchart TB
    user["👤 User<br/>Web Browser"]

    subgraph container1 ["📦 Single Container: Apache + mod_php"]
        apache["🌐 Apache Web Server<br/>Handles HTTP + PHP"]
        modphp["🔧 mod_php Module<br/>PHP embedded in Apache"]
        apache --> modphp
    end

    subgraph container2a ["📦 Container 1: Nginx"]
        nginx["🌐 Nginx Web Server<br/>HTTP requests only"]
    end

    subgraph container2b ["📦 Container 2: PHP-FPM"]
        phpfpm["⚙️ PHP-FPM Manager<br/>Process manager"]
        workers["🔧 PHP Workers<br/>Separate processes"]
        phpfpm --> workers
    end

    drupal["📁 Drupal Files<br/>PHP/HTML Code"]

    user -- 🅰️ --> apache
    user -- 🅱️ --> nginx
    modphp --> drupal
    nginx -->|"FastCGI"| phpfpm
    workers --> drupal

    classDef webserver fill:#e1f5fe,stroke:#0277bd,stroke-width:2px
    classDef phpengine fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef drupalfiles fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
    classDef user fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef container fill:#f5f5f5,stroke:#666,stroke-width:2px,stroke-dasharray: 5 5

    class apache,nginx webserver
    class modphp,phpfpm,workers phpengine
    class drupal drupalfiles
    class user user
    class container1,container2a,container2b container
```

**Key Differences:**

| Aspect | 🅰️ Apache + mod_php (Our Choice) | 🅱️ Nginx + PHP-FPM |
|--------|-----------------------------------|---------------------|
| **Architecture** | Monolithic (one process) | Separated (two services) |
| **PHP Execution** | Inside Apache processes | Separate PHP processes |
| **Process Management** | Apache handles everything | PHP-FPM manages PHP workers |
| **Deployment** | Single container | Multiple containers |
| **Configuration** | Simpler | More complex |
| **Resource Isolation** | Shared memory space | Better isolation |
| **Monitoring** | Apache server-status + custom metrics | PHP-FPM status + Nginx metrics |
| **Use Case** | Traditional LAMP, simpler setups | High-traffic, microservices |
