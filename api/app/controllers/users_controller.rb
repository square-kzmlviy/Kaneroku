# frozen_string_literal: true

class UsersController < ApplicationController
  def create
    user = User.new(user_create_params)
    if user.save
      log_in(user)
      render json: { user: user }, status: :created
    else
      render json: { logged_in: false, message: '既に登録されたユーザーネームです' }, status: :bad_request
    end
  end
  wrap_parameters :user, include: %i[name address
                                     password]

  private

  def user_create_params
    params.require(:user).permit(:name, :email,
                                 :password, :password_confirmation)
  end
end
