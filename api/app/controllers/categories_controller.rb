class CategoriesController < ApplicationController
  def index
    if current_user
      render json: current_user.categories, status: :ok
    else
      render json: { data: [], message: 'ユーザーが存在しません' }, status: :no_content
    end
  end
end
