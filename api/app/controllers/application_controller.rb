# frozen_string_literal: true

class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :current_user
  def current_user
    if session[:user_id]
      if @current_user.nil?
        @current_user = User.find_by(id: session[:user_id])
      else
        @current_user
      end
    end
  end

  def log_in(user)
    session[:user_id] = user.id
    render status: :ok
  end

  def log_out
    session[:user_id] = nil
  end
end
