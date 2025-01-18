class Admin::OptionValuesController < Admin::ApplicationController
  def new
    @option_type = OptionType.includes(:option_values).find(params[:option_type_id])
  end
end