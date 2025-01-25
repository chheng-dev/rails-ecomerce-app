module Api
  class ProductOptionTypesService
    def initialize(product_id)
      @product_id = product_id
    end

    def call
      product = Product.find_by(id: @product_id)
      return [] unless product

      product.option_types.as_json(
        only: [:id, :name],
        include: { option_values: { only: [:id, :name] } }
      )
    end
  end
end