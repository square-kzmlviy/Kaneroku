# frozen_string_literal: true

class User < ApplicationRecord
  validates :name, uniqueness: true
  has_secure_password
  has_many :categories
end
