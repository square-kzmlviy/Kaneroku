# frozen_string_literal: true

class MoneyBalance < ApplicationRecord
	belongs_to :user
	belongs_to :category
end
