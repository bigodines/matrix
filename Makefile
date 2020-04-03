.PHONY: sync
sync:
	git fetch upstream && git merge upstream/master
