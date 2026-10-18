import { i as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, q as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Copy, i as LoaderCircle, n as ShieldAlert, o as ChevronDown, r as PenLine, s as Check } from "../_libs/lucide-react.mjs";
import { i as getServerFnById, n as createServerFn, r as TSS_SERVER_FUNCTION } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BkhB4mS1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var translateMessage = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("39c0cab2ab9d810a0b2f18b4922aa4438fe5c8e00783967dae4eb85acfe8fbbf"));
var SAMPLES = [
	"You never text me back and it makes me feel like I don't matter to you.",
	"I need the evening to myself. Please don't turn this into a fight.",
	"I'm hurt that you cancelled again. I still want to see you — I just need a plan I can count on."
];
function fieldClass() {
	return "min-h-12 w-full appearance-none rounded-lg border border-line bg-sheet px-3 py-3 text-base text-ink outline-none focus-visible:border-clay focus-visible:ring-2 focus-visible:ring-clay/30";
}
function humanize(error) {
	if (error instanceof Error && error.message) {
		if (/fetch|network|load failed|failed to fetch/i.test(error.message)) return "Couldn't reach the server. Check your connection and try again.";
		if (error.message.length < 180 && !error.message.includes("\n")) return error.message;
	}
	return "Something went wrong. Please try again.";
}
function Translator() {
	const baseId = (0, import_react.useId)();
	const [senderStyle, setSenderStyle] = (0, import_react.useState)("NOT_SURE");
	const [receiverStyle, setReceiverStyle] = (0, import_react.useState)("NOT_SURE");
	const [channel, setChannel] = (0, import_react.useState)("TEXT_MESSAGE");
	const [locale, setLocale] = (0, import_react.useState)("US");
	const [raw, setRaw] = (0, import_react.useState)("");
	const [submitted, setSubmitted] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [result, setResult] = (0, import_react.useState)(null);
	const [draft, setDraft] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const seq = (0, import_react.useRef)(0);
	const draftRef = (0, import_react.useRef)(null);
	const outcome = result && result.kind !== "error" ? result : null;
	const notice = outcome && outcome.kind !== "ok" ? outcome : null;
	const translation = outcome?.kind === "ok" ? outcome.translation : null;
	const count = raw.length;
	const suggestion = translation?.draftSuggestions.possibleWayToSayIt ?? "";
	(0, import_react.useEffect)(() => {
		if (!outcome && !error) return;
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		document.getElementById("outcome")?.scrollIntoView({
			behavior: reduce ? "auto" : "smooth",
			block: "nearest"
		});
	}, [outcome, error]);
	(0, import_react.useEffect)(() => {
		if (!copied) return;
		const timer = window.setTimeout(() => setCopied(false), 1600);
		return () => window.clearTimeout(timer);
	}, [copied]);
	async function run(acknowledged) {
		const text = (acknowledged ? submitted : raw).trim();
		if (text.length < 2 || loading) return;
		const id = ++seq.current;
		setLoading(true);
		setError(null);
		setResult(null);
		setDraft("");
		setCopied(false);
		setSubmitted(text);
		try {
			const data = await translateMessage({ data: {
				rawInput: text,
				senderStyle,
				receiverStyle,
				channel,
				locale,
				safetyAcknowledged: acknowledged
			} });
			if (seq.current !== id) return;
			if (data.kind === "error") {
				setError(data.message);
				return;
			}
			setResult(data);
			if (data.kind === "ok") setDraft(data.translation.draftSuggestions.possibleWayToSayIt);
		} catch (caught) {
			if (seq.current !== id) return;
			setError(humanize(caught));
		} finally {
			if (seq.current === id) setLoading(false);
		}
	}
	async function copyDraft() {
		const text = draftRef.current?.value ?? draft;
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
		} catch {
			draftRef.current?.focus();
			draftRef.current?.select();
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-paper text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 bg-clay" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto w-full max-w-3xl px-5 pt-8 pb-28 sm:px-8 sm:pt-14",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-start gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-11 shrink-0 place-items-center rounded-lg bg-ink text-sheet",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, {
							className: "size-5",
							"aria-hidden": true
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-widest text-muted uppercase",
							children: "Wording desk"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-1 font-serif text-3xl leading-tight text-balance text-ink sm:text-4xl",
							children: "Attachment Translator"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-xl text-base leading-relaxed text-pretty text-muted",
							children: "Reword a hard message without sanding off what you actually mean."
						})
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "mt-8 border-l-2 border-clay pl-4 text-sm leading-relaxed text-pretty text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-ink",
						children: "A note. "
					}), "Attachment patterns are general tendencies, not fixed labels, and your read of another person is a guess. This offers wording suggestions. It isn’t therapy or a substitute for professional support."]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-8 rounded-2xl bg-sheet p-5 shadow-sheet sm:p-6",
					onSubmit: (event) => {
						event.preventDefault();
						run(false);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: `${baseId}-sender`,
										className: "text-sm font-medium text-ink",
										children: "My tendency"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											id: `${baseId}-sender`,
											value: senderStyle,
											onChange: (event) => setSenderStyle(event.target.value),
											className: `${fieldClass()} pr-10`,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "NOT_SURE",
													children: "Not sure"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "ANXIOUS_PATTERNS",
													children: "Tends toward anxious patterns"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "AVOIDANT_PATTERNS",
													children: "Tends toward avoidant patterns"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "FEARFUL_AVOIDANT_PATTERNS",
													children: "Tends toward mixed patterns"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "SECURE_PATTERNS",
													children: "Tends toward secure patterns"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
											className: "pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted",
											"aria-hidden": true
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: `${baseId}-receiver`,
										className: "text-sm font-medium text-ink",
										children: "Their tendency"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											id: `${baseId}-receiver`,
											value: receiverStyle,
											onChange: (event) => setReceiverStyle(event.target.value),
											className: `${fieldClass()} pr-10`,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "NOT_SURE",
													children: "Not sure — a guess is fine"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "AVOIDANT_PATTERNS",
													children: "May be sensitive to pressure or closeness"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "ANXIOUS_PATTERNS",
													children: "May be sensitive to distance or rejection"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "FEARFUL_AVOIDANT_PATTERNS",
													children: "May be sensitive to conflict and pressure"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "SECURE_PATTERNS",
													children: "Seems comfortable with direct dialogue"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
											className: "pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted",
											"aria-hidden": true
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: `${baseId}-channel`,
										className: "text-sm font-medium text-ink",
										children: "Medium"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											id: `${baseId}-channel`,
											value: channel,
											onChange: (event) => setChannel(event.target.value),
											className: `${fieldClass()} pr-10`,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "TEXT_MESSAGE",
													children: "Text message"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "EMAIL",
													children: "Email"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "PHONE_CALL",
													children: "Phone call"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "IN_PERSON",
													children: "In person"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
											className: "pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted",
											"aria-hidden": true
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: `${baseId}-locale`,
											className: "text-sm font-medium text-ink",
											children: "Where you are"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												id: `${baseId}-locale`,
												value: locale,
												onChange: (event) => setLocale(event.target.value),
												className: `${fieldClass()} pr-10`,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "US",
														children: "United States"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "GB",
														children: "United Kingdom"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "CA",
														children: "Canada"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "AU",
														children: "Australia"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "INTL",
														children: "Somewhere else"
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
												className: "pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted",
												"aria-hidden": true
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted",
											children: "Used only to show the right support lines."
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-col gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: `${baseId}-draft`,
									className: "text-sm font-medium text-ink",
									children: "The unedited version"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									id: `${baseId}-draft`,
									rows: 5,
									maxLength: 1500,
									value: raw,
									onChange: (event) => {
										setRaw(event.target.value);
										if (error) setError(null);
									},
									onKeyDown: (event) => {
										if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
											event.preventDefault();
											run(false);
										}
									},
									placeholder: "Say it the messy way first.",
									className: "min-h-36 w-full resize-y rounded-lg border border-line bg-sheet px-3 py-3 font-serif text-lg leading-relaxed text-ink outline-none placeholder:font-sans placeholder:text-base placeholder:text-muted/80 focus-visible:border-clay focus-visible:ring-2 focus-visible:ring-clay/30"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline justify-between gap-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-muted",
										children: ["At least a couple of words.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden sm:inline",
											children: " Ctrl+Enter to generate."
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: `tabular-nums ${count > 1400 ? "text-clay" : "text-muted"}`,
										children: [count, "/1500"]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-ink",
								children: "Try a rough draft"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex flex-col gap-2",
								children: SAMPLES.map((sample) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setRaw(sample);
										if (error) setError(null);
									},
									className: "min-h-11 rounded-lg border border-line px-3 py-2 text-left text-sm leading-snug text-ink hover:border-clay",
									children: sample
								}, sample))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: loading || raw.trim().length < 2,
							className: "mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-ink px-4 text-base font-medium text-sheet hover:bg-clay-deep disabled:bg-line disabled:text-muted disabled:hover:bg-line sm:w-auto sm:min-w-56",
							children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								className: "size-4 animate-spin motion-reduce:animate-none",
								"aria-hidden": true
							}), "Generating…"] }) : "Generate suggestions"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					id: "outcome",
					className: "scroll-mt-6",
					children: [
						loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "status",
							className: "mt-6 text-sm text-muted",
							children: "Safety check first, then wording. This usually takes a few seconds."
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							role: "alert",
							className: "rise mt-6 rounded-xl border border-line bg-sheet px-4 py-4 text-sm text-ink",
							children: error
						}),
						notice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							role: "alert",
							className: "rise mt-6 rounded-xl border border-clay/40 bg-clay/10 px-4 py-5 sm:px-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
										className: "mt-0.5 size-5 shrink-0 text-clay",
										"aria-hidden": true
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "font-serif text-2xl text-ink",
											children: notice.kind === "retry" ? "Please try again" : "Safety notice"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm leading-relaxed text-pretty text-ink",
											children: notice.guidance
										})]
									})]
								}),
								notice.kind === "intercept" && notice.crisisResources.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-4 grid gap-3",
									children: notice.crisisResources.map((resource) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "rounded-lg bg-sheet px-3 py-3 text-sm",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-medium text-ink",
												children: resource.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-muted",
												children: resource.contactInfo
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: resource.link,
												target: "_blank",
												rel: "noopener noreferrer",
												className: "mt-2 inline-flex min-h-11 items-center text-ink underline decoration-clay underline-offset-4",
												children: "Open website"
											})
										]
									}, resource.link))
								}),
								notice.kind === "retry" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => void run(false),
									disabled: loading,
									className: "mt-4 inline-flex min-h-11 items-center rounded-lg border border-line bg-sheet px-4 text-sm font-medium text-ink hover:border-clay disabled:text-muted",
									children: "Try again"
								}),
								notice.kind === "intercept" && !notice.hardBlock && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => void run(true),
									disabled: loading,
									className: "mt-4 inline-flex min-h-11 items-center rounded-lg border border-line bg-sheet px-4 text-sm font-medium text-ink hover:border-clay disabled:text-muted",
									children: "I understand, generate a draft anyway"
								})
							]
						}),
						translation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rise mt-8 flex flex-col gap-4",
							children: [
								(translation.deconstruction.senderCoreNeed || translation.deconstruction.possibleReceiverSensitivity) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [translation.deconstruction.senderCoreNeed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-sm font-medium text-ink",
										children: "What you need"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-1 text-sm leading-relaxed text-pretty text-muted",
										children: translation.deconstruction.senderCoreNeed
									})] }), translation.deconstruction.possibleReceiverSensitivity && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-sm font-medium text-ink",
										children: "They may be sensitive to"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-1 text-sm leading-relaxed text-pretty text-muted",
										children: translation.deconstruction.possibleReceiverSensitivity
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 md:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
										className: "rounded-xl border border-line p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "text-sm font-medium text-muted",
											children: "Your original words"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-3 font-serif text-lg leading-relaxed whitespace-pre-wrap text-ink italic",
											children: [
												"“",
												submitted,
												"”"
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
										className: "rounded-xl bg-sheet p-4 shadow-sheet",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "text-sm font-medium text-clay-deep",
												children: "A possible way to say it"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												ref: draftRef,
												rows: 5,
												value: draft,
												onChange: (event) => setDraft(event.target.value),
												"aria-label": "Editable suggestion",
												className: "mt-3 min-h-32 w-full resize-y rounded-lg border border-line bg-sheet px-3 py-2 font-serif text-lg leading-relaxed text-ink outline-none focus-visible:border-clay focus-visible:ring-2 focus-visible:ring-clay/30"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-sm text-muted",
												children: "Edit this so it sounds like you before sending."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-2 flex flex-wrap gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														type: "button",
														onClick: () => void copyDraft(),
														className: "inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-medium text-ink",
														children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
															className: "size-4",
															"aria-hidden": true
														}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
															className: "size-4",
															"aria-hidden": true
														}), copied ? "Copied" : "Copy"]
													}),
													translation.draftSuggestions.alternativeShort && draft !== translation.draftSuggestions.alternativeShort && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => setDraft(translation.draftSuggestions.alternativeShort),
														className: "inline-flex min-h-11 items-center rounded-lg px-2 text-sm font-medium text-ink",
														children: "Use shorter version"
													}),
													suggestion && draft !== suggestion && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => setDraft(suggestion),
														className: "inline-flex min-h-11 items-center rounded-lg px-2 text-sm font-medium text-ink",
														children: "Restore suggestion"
													})
												]
											}),
											translation.draftSuggestions.alternativeShort && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-3 border-t border-line pt-3 text-sm leading-relaxed text-muted",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-medium text-ink",
													children: "Shorter. "
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-serif text-base text-ink italic",
													children: [
														"“",
														translation.draftSuggestions.alternativeShort,
														"”"
													]
												})]
											})
										]
									})]
								}),
								(translation.communicationNotes.clarityAndHonesty || translation.communicationNotes.howItEasesDefensiveness || translation.senderReflection) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
									className: "rounded-xl border border-line px-4 py-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "text-sm font-medium text-ink",
											children: "Why this wording"
										}),
										translation.communicationNotes.clarityAndHonesty && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-3 text-sm leading-relaxed text-pretty text-muted",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-ink",
												children: "Clarity and honesty. "
											}), translation.communicationNotes.clarityAndHonesty]
										}),
										translation.communicationNotes.howItEasesDefensiveness && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-3 text-sm leading-relaxed text-pretty text-muted",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-ink",
												children: "Easing defensiveness. "
											}), translation.communicationNotes.howItEasesDefensiveness]
										}),
										translation.senderReflection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 font-serif text-base leading-relaxed text-pretty text-ink italic",
											children: translation.senderReflection
										})
									]
								}),
								outcome?.kind === "ok" && outcome.crisisResources.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
									className: "rounded-xl border border-line px-4 py-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-sm font-medium text-ink",
										children: "Support is still here"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-3 grid gap-3",
										children: outcome.crisisResources.map((resource) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "text-sm",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-medium text-ink",
													children: [resource.name, ". "]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-muted",
													children: [resource.contactInfo, " "]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
													href: resource.link,
													target: "_blank",
													rel: "noopener noreferrer",
													className: "text-ink underline decoration-clay underline-offset-4",
													children: "Website"
												})
											]
										}, resource.link))
									})]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "mt-12 border-t border-line pt-5 text-sm leading-relaxed text-pretty text-muted",
					children: [
						"This isn’t a crisis service. If you or someone else may be in danger, contact local emergency services or a confidential line.",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://findahelpline.com/",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-ink underline decoration-clay underline-offset-4",
							children: "Find a helpline"
						}),
						"."
					]
				})
			]
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Translator, {});
}
//#endregion
export { Home as component };
