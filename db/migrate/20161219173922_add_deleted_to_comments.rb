class AddDeletedToComments < ActiveRecord::Migration[5.1]
  def change
    add_column :comments, :deleted, :boolean, default: false
  end
end
