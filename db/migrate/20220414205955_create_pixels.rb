class CreatePixels < ActiveRecord::Migration[6.1]
  def change
    create_table :pixels do |t|
      t.string :color
      t.string :location

      t.timestamps
    end
  end
end
