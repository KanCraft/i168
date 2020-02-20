//
//  ViewController.swift
//  i168
//
//  Created by Hiromu Ochiai on 2019/08/06.
//  Copyright © 2019 otiai10. All rights reserved.
//

import UIKit
import WebKit

class ViewController: UIViewController, WKNavigationDelegate {

    let KCURL = "http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/"
    // let KCURL = "http://google.com"

    @IBOutlet weak var game: WKWebView!
    @IBOutlet weak var reloadButton: UIButton!

    override func viewDidLoad() {
        super.viewDidLoad()
        self.game.navigationDelegate = self
        self.loadGame()
        let recognizer = UILongPressGestureRecognizer(target: self, action: #selector(reloadButtonLongPressed))
        self.reloadButton.addGestureRecognizer(recognizer)
    }

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        let url = webView.url!
        self.setCookie()
        if url.absoluteString == KCURL {
            self.injectJavaScript()
        }
    }

    @IBAction func onCameraButtonTouchDown(_ sender: Any) {
        UIGraphicsBeginImageContext(self.game.bounds.size)
        self.game.layer.render(in: UIGraphicsGetCurrentContext()!)
        let screenshot = UIGraphicsGetImageFromCurrentImageContext()
        UIImageWriteToSavedPhotosAlbum(screenshot!, nil, nil, nil)
    }

    @IBAction func onHelpButtonTouchDown(_ sender: Any) {
        let alert = UIAlertController(title: "ヘルプ", message: "i168のwikiを開きます", preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "キャンセル", style: .cancel, handler: nil))
        alert.addAction(UIAlertAction(title: "OK", style: .default, handler: {(action: UIAlertAction!) in
            UIApplication.shared.open(URL(string: "https://github.com/otiai10/i168/wiki")!, options: [:], completionHandler: nil)
        }))
        self.present(alert, animated: true, completion: nil)
    }

    @objc func reloadButtonLongPressed() {
        self.loadGame()
    }

    private func loadGame() {
        let req = URLRequest(url: URL(string: KCURL)!)
        self.game.load(req)
    }

    private func injectJavaScript() {
        let script = """
            // i168: Scale Page To Fit
            var meta = document.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=device-width, user-scalable=0';
            document.querySelector('head').appendChild(meta);
            // i168: Hide DMM Navigation Bar
            document.body.style.position = 'absolute';
            document.body.style.top = '-77px';
            // i168: Disable Scroll
            document.body.style.overflow = 'hidden';
        """
        self.game.evaluateJavaScript(script)
    }

    // https://kancolle.fandom.com/wiki/Tutorial:_Connection
    private func setCookie() {
        let script = """
            expires=new Date(+new Date()+31536e6).toUTCString()
            document.cookie=`ckcy=1;expires=${expires};path=/netgame;domain=.dmm.com`
        """
        self.game.evaluateJavaScript(script)
    }
}

