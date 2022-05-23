class EditsController < ApplicationController
rescue_from ActiveRecord::RecordInvalid,with: :render_unprocessable_entity

    def index
        render json: Edit.all.order(:id)
    end

    def create
        unless User.find(session[:user_id]).edits.empty?
        timeout = User.find(session[:user_id]).edits.last.created_at + (60)
        end
        pixel= Pixel.find(params[:id])
        if pixel.color==params[:color]
            render json: {errors: ["Please select a new color"]},status: 400
        elsif User.find(session[:user_id]).edits.empty? || Time.now> timeout
            new_edit= Edit.create!(user_id: session[:user_id],pixel_id: params[:id],location: params[:location],new_color: params[:color],old_color:pixel.color)
            pixel.update!(color: params[:color])
            ActionCable.server.broadcast('channel5',new_edit)
            render json: new_edit
        else render json:{errors: ["Too many attempts. Try again at","#{timeout}"]},status: 429
        end
    end

    private

    def render_unprocessable_entity invalid
        render json: {errors: invalid.record.errors.full_messages},status: :unprocessable_entity
    end
end
