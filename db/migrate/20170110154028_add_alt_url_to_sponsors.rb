class AddAltUrlToSponsors < ActiveRecord::Migration[5.1]
  def change
    add_column :sponsors, :alt_url, :string
  end
end
