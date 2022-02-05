# frozen_string_literal: true

class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :current_user
  def current_user
    if cookies.permanent.signed[:user_id]
      if @current_user.nil?
        @current_user = User.find_by(id: cookies.permanent.signed[:user_id])
      else
        @current_user
      end
    end
  end

  def log_in
    cookies.permanent.signed[:user_id] = @user.id
  end

  def log_out
    cookies.permanent.signed[:user_id] = nil
  end
end
