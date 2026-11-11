(() => {
    const React = vendetta.metro.common.React;
    const RN = vendetta.metro.common.ReactNative;
    const { View, Image, Dimensions, AppRegistry } = RN;
    const SPRITES = {"idle":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABWklEQVR4nO2ZMW7CQBBFP1FokNLTpbSM0rixRMUZXOYWcBK4RcqcgSpSmjRRUMqcgwKqkZwR4/Xuer0aM6+zZMbeeexfew0YSinK9aUo15fc13lIfQOpeYwtwLvze/qYxda8VVfCDHCoc74mQueTGSC+d1sAwMv+ACC8o7yOC/UGghNjjDWgjTSn1BsYbA58fb4PVQoAUNVNr/PMwNCd53VdJtQb8E4hSp9UnZcgEzyN1BuwAeRGTKGxV9pQpmuAQ7PfZYbndt+0Cv3d9AzwDlMnFk/LkW7JD/UGbAC5EZ+FpLlAaUHHP6c/AMCqfO680Pzt+O/4/LrpPJ/XneyzkLcBgptIhdR5YroGiL7PRKnfie/XgAR/M+u7i+CLa49VvQHbF8pN9NeUoXcpXLnPUW8g2QCqukmWTG3UG4hOodZ/9eaK7bIQO3fMACF12pUmVd1E7T+pN2Dk5grxJ327VmscHwAAAABJRU5ErkJggg==","walk0":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABWklEQVR4nO2ZMW7CQBBFP1FokNLTpbSM0rixRMUZXOYWcBK4RcqcgSpSmjRRUMqcgwKqkZwR4/Xuer0aM6+zZMbeeexfew0YSinK9aUo15fc13lIfQOpeYwtwLvze/qYxda8VVfCDHCoc74mQueTGSC+d1sAwMv+ACC8o7yOC/UGghNjjDWgjTSn1BsYbA58fb4PVQoAUNVNr/PMwNCd53VdJtQb8E4hSp9UnZcgEzyN1BuwAeRGTKGxV9pQpmuAQ7PfZYbndt+0Cv3d9AzwDlMnFk/LkW7JD/UGbAC5EZ+FpLlAaUHHP6c/AMCqfO680Pzt+O/4/LrpPJ/XneyzkLcBgptIhdR5YroGiL7PRKnfie/XgAR/M+u7i+CLa49VvQHbF8pN9NeUoXcpXLnPUW8g2QCqukmWTG3UG4hOodZ/9eaK7bIQO3fMACF12pUmVd1E7T+pN2Dk5grxJ327VmscHwAAAABJRU5ErkJggg==","walk1":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABSklEQVR4nO2ZsQ6CMBCGf40uJu5ujgTj4mLC5DM4+hb6JPoWjj6Dk4mLi5E4+hwOOF0iFw9ooTTF+zYSPOh93rW0gBIoUZxkUZxkvp/Td/0CrhnUDcCz80wvvboxf8WVUAMcypypCdt6UgPEfbcFAMz3BwD2GeVxygjegHXHaGMO+EaqqeANNFYDt+upqVAAgMVyXek+NdB05nncMhPBGzDuQtR9XGVegkzwbhS8AR2Ab8Qu1PZMa0t3DXCo+svM8L5dtVvZ/q57BniGKROj8aSlVzIjeAM6AN+IayGpFqhb0PUjfQEAZvG08EHD4zl3/d6sCu/ncTu7FjI2QHATrpAyT3TXAFF1TeT6m/h/DUjwL7OquwimlO2xBm9A94V8Y23g67+Z61JtzQ9E8AZ0AL5p/IyMMJ0XbGtGDUiZNj2lXCzX/3lKqfjmAzHqeE4p7Vt1AAAAAElFTkSuQmCC","sleep":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABYElEQVR4nO2YoY7CQBCG/17AkJw/hyQlmDMkqHsGJG9xPAm8BZJnQJFgMBcaJA5PgkGAmuS6MN3tdpZm2v1ckzKl83VmdheIKGWQTu6DdHKv+zkfof9AaDpVA5jZOWbbpGrMV3E5ogETylxZE771FA0Qf/NfAMBosQTgn1Ezjg31Brw7xjtmwH+4mlJvQKwG9ru1VCgAwPd46nRfNCCdeTOuzYR6A6W7EHWfUJnnIBNmN1JvIL5A3bBd6N2T1hf1Bpxf4JhtE6ndliTqDTzVgPntU7/vfX4VBuImpm1e+P6OaJ4BX3wnc9WJ3jwD1GmoFugbvV7OuWvikJ0AAMO0X/ig7mqTu77Nfgrvd42r3gDb17luRJCJ0KtSbhVKNNcA4bomCr0nbq8BDnNn5nqKUBbb+ku9gdonMUdrzoUqr++lTylsfd9EvQGxGgjVhWyoNyC2x5U6xSi771ZvIBJpOw+VbnphGeF3BQAAAABJRU5ErkJggg=="};
    const SIZE = 48;
    const STEP = 80;
    const listeners = new Set();
    let enabled = false;
    let removePatch = null;

    const clamp = (value, low, high) => Math.max(low, Math.min(high, value));

    function Cat() {
        const size = RN.useWindowDimensions ? RN.useWindowDimensions() : Dimensions.get("window");
        const width = Math.max(80, size.width);
        const height = Math.max(100, size.height);
        const maxX = Math.max(0, width - SIZE);
        const maxY = Math.max(0, height - SIZE);
        const point = React.useRef({ x: Math.max(0, width - 85), y: Math.max(0, height - 110) });
        const target = React.useRef({ ...point.current });
        const lastActivity = React.useRef(Date.now());
        const nextMove = React.useRef(Date.now() + 1200);
        const dragging = React.useRef(false);
        const origin = React.useRef(null);
        const direction = React.useRef(1);
        const ticks = React.useRef(0);
        const [position, setPosition] = React.useState({ ...point.current, walking: false, sleeping: false, frame: 0, direction: 1 });
        const [visible, setVisible] = React.useState(enabled);

        React.useEffect(() => {
            const update = () => setVisible(enabled);
            listeners.add(update);
            return () => listeners.delete(update);
        }, []);

        React.useEffect(() => {
            point.current.x = clamp(point.current.x, 0, maxX);
            point.current.y = clamp(point.current.y, 0, maxY);
            target.current.x = clamp(target.current.x, 0, maxX);
            target.current.y = clamp(target.current.y, 0, maxY);

            const timer = setInterval(() => {
                if (!enabled || dragging.current) return;
                const now = Date.now();
                const p = point.current;

                if (now > nextMove.current) {
                    target.current = {
                        x: Math.random() * maxX,
                        y: Math.min(maxY, 35 + Math.random() * Math.max(0, maxY - 75))
                    };
                    nextMove.current = now + 3500 + Math.random() * 3700;
                }

                const dx = target.current.x - p.x;
                const dy = target.current.y - p.y;
                const distance = Math.hypot(dx, dy);
                const walking = distance > 2;
                if (walking) {
                    const step = Math.min(5, distance);
                    p.x = clamp(p.x + dx / distance * step, 0, maxX);
                    p.y = clamp(p.y + dy / distance * step, 0, maxY);
                    if (Math.abs(dx) > 0.2) direction.current = dx < 0 ? -1 : 1;
                    lastActivity.current = now;
                }

                ticks.current++;
                setPosition({
                    x: p.x, y: p.y, walking,
                    sleeping: !walking && now - lastActivity.current > 8000,
                    frame: Math.floor(ticks.current / 3) % 2,
                    direction: direction.current
                });
            }, STEP);

            return () => clearInterval(timer);
        }, [maxX, maxY]);

        if (!visible) return null;

        const sprite = position.sleeping ? SPRITES.sleep : position.walking
            ? (position.frame ? SPRITES.walk1 : SPRITES.walk0) : SPRITES.idle;

        return React.createElement(View, {
            pointerEvents: "box-none",
            collapsable: false,
            style: { position: "absolute", top: 0, bottom: 0, left: 0, right: 0, zIndex: 9999, elevation: 12 }
        }, React.createElement(View, {
            collapsable: false,
            style: { position: "absolute", top: position.y, left: position.x, width: SIZE, height: SIZE },
            onStartShouldSetResponder: () => true,
            onMoveShouldSetResponder: () => true,
            onResponderGrant: e => {
                dragging.current = true;
                const event = e.nativeEvent;
                origin.current = { x: point.current.x, y: point.current.y, pageX: event.pageX, pageY: event.pageY };
            },
            onResponderMove: e => {
                const from = origin.current;
                if (!from) return;
                const event = e.nativeEvent;
                if (typeof event.pageX !== "number" || typeof event.pageY !== "number") return;
                const x = clamp(from.x + event.pageX - from.pageX, 0, maxX);
                const y = clamp(from.y + event.pageY - from.pageY, 0, maxY);
                point.current = { x, y };
                target.current = { x, y };
                lastActivity.current = Date.now();
                setPosition(p => ({ ...p, x, y, walking: false, sleeping: false }));
            },
            onResponderRelease: () => {
                dragging.current = false;
                origin.current = null;
                nextMove.current = Date.now() + 1300;
            },
            onResponderTerminate: () => { dragging.current = false; origin.current = null; }
        }, React.createElement(Image, {
            source: { uri: sprite },
            resizeMode: "contain",
            fadeDuration: 0,
            style: { width: SIZE, height: SIZE, transform: [{ scaleX: position.direction }] }
        })));
    }

    function Root({ children }) {
        return React.createElement(View, {
            collapsable: false,
            pointerEvents: "box-none",
            style: { flex: 1 }
        }, children, React.createElement(Cat));
    }

    function wrapProvider(provider) {
        if (provider && provider.__onekoRoot) return provider;
        const wrapped = parameters => {
            const Wrapper = typeof provider === "function" ? provider(parameters) : null;
            if (!Wrapper) return Root;
            return function OnekoRoot(props) {
                return React.createElement(Root, null, React.createElement(Wrapper, props));
            };
        };
        wrapped.__onekoRoot = true;
        return wrapped;
    }

    function onLoad() {
        enabled = true;
        for (const refresh of listeners) refresh();

        if (typeof AppRegistry?.setWrapperComponentProvider === "function") {
            removePatch = vendetta.patcher.before("setWrapperComponentProvider", AppRegistry, args => {
                if (args[0]?.__onekoRoot) return;
                return [wrapProvider(args[0])];
            });
            AppRegistry.setWrapperComponentProvider(wrapProvider(null));
        } else if (typeof AppRegistry?.registerComponent === "function") {
            removePatch = vendetta.patcher.before("registerComponent", AppRegistry, args => {
                const original = args[1];
                if (typeof original !== "function") return;
                return [args[0], () => {
                    const App = original();
                    return function OnekoApp(props) {
                        return React.createElement(Root, null, React.createElement(App, props));
                    };
                }, ...args.slice(2)];
            });
        } else {
            throw new Error("AppRegistry unavailable");
        }
    }

    function onUnload() {
        enabled = false;
        for (const refresh of listeners) refresh();
        if (removePatch) removePatch();
        removePatch = null;
    }

    return { onLoad, onUnload };
})()
