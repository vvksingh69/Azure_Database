# reusing existing resource group instead of new one
data "azurerm_resource_group" "product_service_rg" {
    name="rg-product-service-sand-ne-001"
}