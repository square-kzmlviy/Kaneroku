# frozen_string_literal: true

class MoneyBalance < ApplicationRecord
  belongs_to :user
  belongs_to :category
  validates :value, :numericality => { :greater_than => 0 }
  validates :category_id, presence: true
end
