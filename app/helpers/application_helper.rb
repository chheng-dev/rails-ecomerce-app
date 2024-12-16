module ApplicationHelper
  def active_class(controller_name, action_name = nil)
    if action_name 
      "active" if controller_name == params[:controller] && action_name == params[:action_name]
    else
      "active" if controller_name == params[:controller]
    end
  end
end
