class UsersController < ApplicationController
rescue_from ActiveRecord::RecordInvalid,with: :render_unprocessable_entity
rescue_from ActiveRecord::RecordNotFound,with: :render_not_found


  def index
    users = User.all
    render json: users
end

def contested_index
  render json: User.all.sort_by{|p| -p.edits.length}.take(10)
  
end

def create
    user = User.create!(user_params)
    if user.valid?
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    user = User.find(session[:user_id])
    if user
      render json: user
    else
      render json: {error: "Not authorized"}, status: :unauthorized
    end
  end

  def update
    user = User.find(session[:user_id])
    user.update!(user_update_params)
    render json: user
  end

  def destroy
    user = User.find(session[:user_id])
    user.edits.update_all(user_id:nil)
    user.destroy
    session.delete :user_id
    head :no_content
  end

  private

  def user_params
    params.permit(:username, :password, :display_name, :avatar)
  end

  def user_update_params
    params.permit(:username,:display_name,:avatar)
  end

  def render_unprocessable_entity invalid
    render json: {errors: invalid.record.errors.full_messages},status: :unprocessable_entity
  end

  def render_not_found
    render json: {error: "User not found"}, status: 404
  end
end
