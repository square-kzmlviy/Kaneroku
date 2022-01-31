class CategoriesController < ApplicationController
  def index
    if current_user
      render json: current_user.categories, status: :ok
    else
      render json: { data: [], message: 'ユーザーが存在しません' }, status: :no_content
    end
  end

  def create
    if current_user
      category = Category.new(category_create_params)
      if category.save
        render json: { category: category }, status: :created
      else
        render status: :bad_request
      end
    else
      render json: { data: [], message: 'ユーザーが存在しません' }, status: :no_content
    end
  end

  def category_create_params
    params.require(:category).permit(:name, :is_income, :category_icon_id).merge(user_id: current_user.id)
  end
end
