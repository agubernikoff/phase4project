class Pixel < ApplicationRecord
    has_many :edits, dependent: :destroy
    has_many :users, through: :edits
end
