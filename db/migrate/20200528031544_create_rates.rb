class CreateRates < ActiveRecord::Migration[6.0]
  def change
    create_table :rates do |t|
      t.float :fixed_rate
      t.datetime :until_time

      t.timestamps
    end
  end
end
