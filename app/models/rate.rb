class Rate < ApplicationRecord
	validates :fixed_rate, :until_time, presence: true
end
