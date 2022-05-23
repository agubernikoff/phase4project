class UserSerializer < ActiveModel::Serializer
  attributes :id,:username,:display_name,:avatar
  has_many :edits
end
