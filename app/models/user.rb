class User < ApplicationRecord
    has_secure_password
    has_many :edits
    has_many :pixels, through: :edits
    validates :password, presence: true, length: {minimum:8},on: :create
    validates :username, presence: true, uniqueness: true,length: {maximum:25}
    
end
