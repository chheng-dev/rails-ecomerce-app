class ProductService
  def self.fetch_option_types_by_product(product_id)
    product = Product.find_by(id: product_id)

    if product 
      product.option_types.as_json(only: [:id, :name], include: :option_values)
    else
      []
    end
  end
end 