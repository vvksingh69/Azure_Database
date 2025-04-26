resource "azurerm_cosmosdb_account" "test_app" {
  location            = data.azurerm_resource_group.product_service_rg.location
  name                = "cos-app-sand-ne-001"
  offer_type          = "Standard"
  resource_group_name = data.azurerm_resource_group.product_service_rg.name
  kind                = "GlobalDocumentDB"

  consistency_policy {
    consistency_level = "Eventual"
  }

  capabilities {
    name = "EnableServerless"
  }

  geo_location {
    failover_priority = 0
    location          = "North Europe"
  }
}