class LeaderboardController < ApplicationController
    def index
        users = User.all.sort_by {|user| [user.edits.length]}
        render json: users, include: :edits
    end
end
