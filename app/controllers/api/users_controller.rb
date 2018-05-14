class Api::UsersController < ApplicationController
  def index
  end

  def show
    @user = User.find(params[:id])
    if @user
      render :show
    else
      render json: @user.errors.full_messages, status: 404
    end
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
    @user = current_user
    if @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def destroy
  end

  def follows_create
  end

  def follows_destroy
  end

  private
  def user_params
    params.require(:user).permit(:email, :full_name, :username, :password, :bio, :avatar)
  end
end
