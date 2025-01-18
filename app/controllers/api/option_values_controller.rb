class Api::OptionValuesController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_option_type
  before_action :set_option_value, only: [:show, :update, :destroy ]

  def index 
    render json: {
      success: true,
      option_value: @option_type.option_values.map do |value|
        {
          id: value.id,
          name: value.name,
          presentation: value.presentation
        }
      end
    }
  end

  def show 
    render json: {
      success: true,
      option_type: {
        id: @option_type.id,
        name: @option_type.name,
        presentation: @option_type.presentation,
        option_values: @option_type.option_values.map do |option_value|
          {
            id: option_value.id,
            name: option_value.name,
            presentation: option_value.presentation
          }
        end
      }
    }
  end

  def create
    option_value = @option_type.option_values.new(option_value_params)
    if option_value.save
      render json: {
        success: true,
        message: 'Option value created successfully.',
        option_value: option_value
      }, status: :created
    else 
      render json: {
        success: false,
        errors: option_value.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def update 
    if @option_value.update(option_value_params)
      render json: {
        success: true,
        message: 'Option type has been updated successfully!',
        option_value: @option_value
      }
    else
      render json: {
        success: false,
        errors: @option_value.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def destroy 
    if @option_value.destroy
      render json: {
        success: true,
        message: 'Option value has been deleted successfully!'
      }
    else
      render json: {
        success: false, 
        errors: 'Failed to delete option values'
      }, status: :unprocessable_entity
    end
  end

  private

  
  def set_option_type
    @option_type = OptionType.find(params[:option_type_id])
  rescue ActiveRecord::RecordNotFound
    render json: {
      success: false,
      errors: "Option type not found."
    }, status: :not_found
  end

  def set_option_value
    @option_value = @option_type.option_values.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: {
      success: false,
      message: 'Option value not found'
    }, status: :not_found
  end

  def option_value_params 
    params.require(:option_value).permit(:name, :presentation)
  end
end
