class Api::CommentsController < ApplicationController
  def index
    @comments = Post.find(params[:id]).comments
    # @posts = current_user.posts
  end

  def show
    @comment = Comment.find(params[:id])
    if @comment
      render :show
    else
      render json: @comment.errors.full_messages, status: 404
    end
  end

  def create
    @comment = current_user.comments.new(comments_params)
    @comment.post_id = Post.find(params[:id]).id
    if @comment.save
      render :show
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    if @comment.destroy
      head :no_content
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  private

  def comments_params
    params.require(:comment).permit(:body)
  end
end
