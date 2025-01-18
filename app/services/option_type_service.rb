class OptionTypeService
  attr_reader :option_type, :errors

  def initialize(params = {}, option_type_id = nil)
    @params = params
    @option_type = nil
    @option_type_id = option_type_id
    @errors = []
  end

  def create 
    @option_type = OptionType.new(@params)

    if @option_type.save
      true
    else 
      @errors = @option_type.errors
      false
    end
  end

  def find_with_option_values
    @option_type = OptionType.includes(:option_values).find(@option_type_id)
    { success: true, option_type: @option_type }
  rescue ActiveRecord::RecordNotFound => e
    { success: false, errors: [e.message] }
  end
end