class Api::UsersController < ApplicationController
  def index
  end

  def show
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
  end

  def destroy
  end

  def follows_create
  end

  def follows_destroy
  end

  private
  def user_params
    params.require(:user).permit(:email, :full_name, :username, :password)
  end
end
