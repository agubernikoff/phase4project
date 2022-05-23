class PixelSerializer < ActiveModel::Serializer
  attributes :id,:location,:color
  has_many :edits
end
