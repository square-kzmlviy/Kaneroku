# frozen_string_literal: true

class Category < ApplicationRecord
  belongs_to :user
  belongs_to :category_icon,optional: true
  has_many :balances
  validates :name, presence: true
end
