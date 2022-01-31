class CategoryIconsController < ApplicationController
    def index
          render json: CategoryIcon.all, status: :ok
    end
end
