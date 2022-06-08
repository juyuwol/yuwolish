require "openssl"
require "digest"
require "base64"

module Jekyll::CustomFilter
	def tweet_content(input)
		input[35..-8]
			.sub(/ data-lang=".+?"><p lang=".+?" dir="ltr"/, ">\n  <p")
			.sub('</p>&mdash;', "</p>\n  <p>—")
			.sub('?ref_src=twsrc%5Etfw">', '">')
			.sub('</blockquote>', "</p>\n</blockquote>")
			.gsub('&quot;', '"')
			.gsub('&#39;', "'")
			.gsub('<br>', "<br>\n  ")
	end

	def search_content(input)
		output = input
			.gsub(/<script.+?<\/script>/m, '')
			.gsub(/<!--.*?-->/m, '')
			.gsub(/<style.+?<\/style>/m, '')
			.gsub(/<.*?>/m, '')
			.strip
			.gsub(/\s+/, ' ')
			.gsub('&lt;', '<')
			.gsub('&gt;', '>')
			.gsub('&amp;', '&')
	end

	def encrypt(input, password)
		cipher = OpenSSL::Cipher.new("aes-256-gcm")
		cipher.encrypt
		iv = cipher.random_iv
		cipher.key = Digest::SHA256.digest(password)
		ciphertext = cipher.update(input) + cipher.final + cipher.auth_tag

		Base64.strict_encode64(iv + ciphertext)
	end
end

Liquid::Template.register_filter(Jekyll::CustomFilter)
