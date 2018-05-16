class Api::PostsController < ApplicationController
  def index
    @posts = User.find(params[:id]).posts
    # @posts = current_user.posts
  end

  def show
    @post = Post.find(params[:id])
    if @post
      render :show
    else
      render json: @post.errors.full_messages, status: 404
    end
  end

  def create
    @post = current_user.posts.new(posts_params)
    if @post.save
      render :show
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  def update
    @post = current_user.posts.find(params[:id])
    if @post.update(posts_params)
      render :show
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  def delete
    @post = current_user.posts.find(params[:id])
    if @post.destroy
      head :no_content
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  private

  def posts_params
    params.require(:post).permit(:caption, :image)
  end

end
