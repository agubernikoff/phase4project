class PixelsController < ApplicationController
    def index
        render json: Pixel.all.order(:id)
    end

    def contested_index
        render json: Pixel.all.sort_by{|p| -p.edits.length}.take(10)
        
    end
end
