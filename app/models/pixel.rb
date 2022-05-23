class Pixel < ApplicationRecord
    has_many :edits
    has_many :users, through: :edits
end
