class ProductStockService
  # Update stock for a specific product
  def self.update_stock(product_id, stock_quantity)
    product = Product.find(product_id)
    product_stock = product.create_product_stock(stock: stock_quantity)
    product_stock
  end

  # Update stock for multiple products
  def self.update_stocks_for_multiple_products(product_ids, stock_quantity) 
    product_ids.each do |product_id|
      product = Product.find(product_id)

      if product.product_stock
        product.product_stock.update(stock: stock_quantity)
      else
        product.create_product_stock(stock: stock_quantity)
      end
    end
  end
end