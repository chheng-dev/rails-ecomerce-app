class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, #jwt_revocation_strategy: JwtBlacklist,
          jwt_revocation_strategy: Devise::JWT::RevocationStrategies::JTIMatcher

  has_one_attached :image

  before_create :set_jti
  # before_create :generate_refresh_token

  def generate_jwt_token
    payload = {
      user_id: id,
      exp: 24.hours.from_now.to_i, 
      jti: authentication_token
    }
    
    JWT.encode(payload, Rails.application.credentials.secret_key_base, 'HS256')
  end

  def generate_refresh_token
    self.refresh_token = SecureRandom.hex(64)
    save!
  end

  def refresh_token_valid?
    self.refresh_token.present?
  end

  def admin?
    self.admin
  end

  private

  def set_jti
    self.authentication_token ||= SecureRandom.uuid
  end
end
