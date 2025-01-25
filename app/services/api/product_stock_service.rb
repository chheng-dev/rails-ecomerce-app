module Api 
  class ProductStockService

    def initialize(product_ids:, stock_quantity:)
      @product_ids = product_ids
      @stock_quantity = stock_quantity
    end

    def call
      if @product_ids.is_a?(Array) && @product_ids.length > 1
        update_stocks_for_multiple_products
      else 
        update_stock(@product_ids.first)
      end
    end

    # Update stock for a specific product
    def update_stock(product_id)
      product = Product.find(product_id)
      if product 
        product_stock = product.create_product_stock(stock: @stock_quantity)
        product_stock
      else
        nil
      end
    end
  
    # Update stock for multiple products
    def update_stocks_for_multiple_products
      @product_ids.each do |product_id|
        product = Product.find(product_id)
  
        if product.product_stock
          product.product_stock.update(stock: stock_quantity)
        else
          product.create_product_stock(stock: stock_quantity)
        end
      end
    end
  end
end