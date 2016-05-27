class EcdsaController < ApplicationController
  before_action :authenticate_user!, only: :demo
  require "openssl"

  def demo
  end

  def generate_key
    $key = OpenSSL::PKey::EC.new(params[:ec_name])
    $key.generate_key
    pub_key = $key.public_key.to_bn.to_s(16)
    pri_key = $key.private_key.to_bn.to_s(16)
    render json: {pub_key: pub_key, pri_key: pri_key}
  end

  def generate_signature
    message = params[:message]
    digest = OpenSSL::Digest.new params[:hash], message
    signature = $key.dsa_sign_asn1 digest.to_s
    signature_hex = signature.unpack("H*").first.upcase
    render json: {signature: signature_hex ,hash_img: digest.to_s.upcase}
  end

  def verify_signature
    message = params[:message]
    digest = OpenSSL::Digest.new params[:hash], message
    signature_arr = [params[:signature]]
    render text: $key.dsa_verify_asn1(digest.to_s, signature_arr.pack("H*")).inspect
  end
end
