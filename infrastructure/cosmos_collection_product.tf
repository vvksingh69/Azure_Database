resource "azurerm_cosmosdb_sql_container" "products" {
  name                = "products"
  resource_group_name = data.azurerm_resource_group.product_service_rg.name
  account_name        = azurerm_cosmosdb_account.test_app.name
  database_name       = azurerm_cosmosdb_sql_database.products_app.name

  partition_key_path    = "/id"
  partition_key_version  = 2 
  default_ttl            = -1

  indexing_policy {
    excluded_path {
      path = "/*"
    }
  }
}