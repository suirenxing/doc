# macos

## 常用快捷键

## Homebrew

- 查看版本 `brew -v`
- 查看已安装 `brew list`
- 安装包 `brew install package`
- 卸载包 `brew uninstall package`
- 卸载 Homebrew

```sh
cd `brew --prefix`
rm -rf Cellar
brew prune
rm `git ls-files`
rm -r Library/Homebrew Library/Aliases Library/Formula Library/Contributions
rm -rf .git
rm -rf ~/Library/Caches/Homebrew
```

**查看 brew 源**
`cd "$(brew --repo)" && git remote -v`
**查看 homebrew-core.git 当前源输出**
`cd "$(brew --repo homebrew/core)" && git remote -v`

**替换源：中科大**
`cd "$(brew --repo)" && git remote set-url origin https://mirrors.ustc.edu.cn/brew.git`
`cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core" && git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git`
`cd "$(brew --repo)/Library/Taps/homebrew/homebrew-cask" && git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-cask.git`
**替换源：阿里**
`cd "$(brew --repo)" && git remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git`
`cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core" && git remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git`
zsh 替换 homebrew-bottles 镜像，Mac OS 在 10.15 系统开始，默认的 shell 都换成了 zsh
`echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles' >> ~/.zshrc`
立即生效
`source ~/.zshrc`
刷新
`brew update`
