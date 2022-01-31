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
    @user = User.find_by(email: login_user[:email])
    if @user
      @user = @user.authenticate(login_user[:password_digest])
      if @user
        log_in
      else
        render json:{message:"パスワードが違う"},status: :not_found
      end
    else
      render json:{message:"登録されていないemailアドレス"},status: :not_found
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
