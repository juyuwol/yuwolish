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
			.gsub(/<script.+?<\/script>/, '')
			.gsub(/<!--.*?-->/, '')
			.gsub(/<style.+?<\/style>/, '')
			.gsub(/<.*?>/, '')
			.strip
			.gsub(/\s+/, ' ')
			.gsub('&lt;', '<')
			.gsub('&gt;', '>')
			.gsub('&amp;', '&')
	end
end

Liquid::Template.register_filter(Jekyll::CustomFilter)
