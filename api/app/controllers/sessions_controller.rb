# frozen_string_literal: true

class SessionsController < ApplicationController
  def show
    if current_user
      render json: { logged_in: true, id: current_user.id, name: current_user.name }, status: :ok
    else
      render json: { logged_in: false, message: 'ユーザーが存在しません' }, status: :no_content
    end
  end

  def create
    user = User.find_by(email: login_user[:email])
               .authenticate(login_user[:password_digest])
    if user
      log_in(user)
    else
      render status: :not_found
    end
  end
  wrap_parameters :user

  def destroy
    log_out
    render json: { logged_out: true }, status: :ok
  end

  private

  def login_user
    params.require(:user).permit(:email, :password_digest)
  end
end
