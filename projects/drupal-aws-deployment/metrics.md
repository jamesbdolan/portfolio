# 🎯 Drupal Metrics Strategy Decision

## How we got here

```mermaid
flowchart TD
    START["🎯 Need Drupal Metrics"] --> CHOICE{"📊 Choose Approach"}

    CHOICE -->|"🔌 Use Contrib Module"| MODULE["drupal/prometheus_metrics"]
    CHOICE -->|"🛠️ Custom Solution"| CUSTOM["Custom prom-metrics.php"]
    CHOICE -->|"🌐 External Agent"| EXTERNAL["New Relic, Datadog,<br/>Elastic APM, etc."]

    MODULE --> MODPROB["❌ Problems:<br/>• Drupal 11 incompatible<br/>• PHP TypeError bugs<br/>• No HTTP basic auth<br/>• Bootstrap overhead"]

    CUSTOM --> CUSTSOL["✅ Our Solution:<br/>• Standalone PHP script<br/>• Direct database queries<br/>• No Drupal dependencies<br/>• Fast & reliable"]

    EXTERNAL --> EXTDASH["📊 External Dashboards:<br/>• New Relic UI<br/>• Datadog Dashboard<br/>• Elastic Kibana<br/>• Third-party interfaces"]

    %% Prometheus/Grafana path
    MODULE -.->|"If it worked"| PROMETHEUS["📈 Prometheus<br/>Metrics Collection"]
    CUSTSOL --> PROMETHEUS

    PROMETHEUS --> GRAFANA["📊 Grafana<br/>Custom Dashboards"]

    GRAFANA --> DASHBOARD["🎯 Working Dashboard<br/>• Drupal metrics<br/>• MySQL metrics<br/>• Unified monitoring"]

    %% Show abandoned path
    MODPROB -.->|"Abandoned"| CUSTSOL

    classDef chosen fill:#e8f5e8,stroke:#1b5e20,stroke-width:3px
    classDef abandoned fill:#ffebee,stroke:#c62828,stroke-width:2px
    classDef decision fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef infrastructure fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef external fill:#fce4ec,stroke:#c2185b,stroke-width:2px

    class CUSTSOL,PROMETHEUS,GRAFANA,DASHBOARD chosen
    class MODPROB abandoned
    class START,CHOICE decision
    class EXTERNAL,EXTDASH external
```

## Our solution

`/prom-metrics.php` is a metrics endpoint with:

- 🚀 **No Drupal bootstrap** - Direct PHP Data Objects database connection (100ms+ saved per request)
- 📊 **Comprehensive metrics** - PHP configuration, Apache processes, Drupal application data
- 🔧 **Apache integration** - Real server-status metrics via `apache_monitoring_setup.sh`
- 🛠️ **Single file solution** - Easy to debug, maintain, and deploy
- ⚠️ **SECURITY NOTE** - It is publicly accessible since it's a standalone PHP script.

Key metrics:

```
# PHP & Apache Metrics
php_memory_usage_bytes, php_memory_limit_bytes
apache_requests_total, apache_workers_busy

# Drupal Application Metrics
drupal_database_up, drupal_users_total
drupal_nodes_total, drupal_errors_24h
drupal_query_execution_time_seconds
```

## Detailed Implementation Notes

### Drupal Prometheus Contrib Module

There were multiple problems with contrib modules:

- `drupal/prometheus_exporter` doesn't support Drupal 11
- `drupal/prometheus_metrics:^1.0@alpha` had PHP TypeError bugs
