class CreateEdits < ActiveRecord::Migration[6.1]
  def change
    create_table :edits do |t|
      t.belongs_to :pixel, null: false, foreign_key: true
      t.belongs_to :user, null: true, foreign_key: true
      t.string :old_color
      t.string :new_color
      t.string :location

      t.timestamps
    end
  end
end
