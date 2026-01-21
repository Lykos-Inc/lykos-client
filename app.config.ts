export default defineAppConfig({
    ui: {
        // BUTTON
        button: {
            slots: {
                base: ['rounded-md font-medium'],
            },
            padding: {
                sm: 'px-3 py-2',
                md: 'px-4 py-2.5',
                lg: 'px-6 py-3'
            },

            variant: {
                solid: {
                    primary: `
            bg-[var(--btn-primary-bg)]
            text-[var(--btn-primary-text)]
            hover:bg-[var(--btn-primary-bg-hover)]
          `
                },

                outline: {
                    secondary: `
            border
            border-[var(--btn-secondary-border)]
            text-[var(--btn-secondary-text)]
            hover:bg-[var(--btn-secondary-hover-bg)]
          `
                },

                ghost: {
                    default: `
            text-[var(--btn-ghost-text)]
            hover:bg-[var(--btn-ghost-hover-bg)]
          `
                }
            }
        },

        // CARD
        card: {
            slots: {
                // 'base' e 'hover' do v2 agora vão juntos no slot 'root'
                root: `
          bg-[var(--card-bg)]
          border
          border-[var(--card-border-color)]
          rounded-[var(--card-radius)]
          shadow-[var(--card-shadow)]
          transition
          hover:bg-[var(--card-bg-hover)]
          hover:shadow-[var(--card-shadow-hover)]
        `,

                // O antigo 'body.padding' vira apenas a string de classes do slot 'body'
                body: 'p-[var(--card-padding-md)]',

                // O mesmo vale para header e footer
                header: 'p-[var(--card-padding-md)] border-b border-[var(--ui-border)]',

                footer: 'p-[var(--card-padding-md)] border-t border-[var(--ui-border)]'
            }
        },

        // INPUT
        input: {
            slots: {
                base: `
          rounded-md
          placeholder:text-[var(--input-placeholder)]
          focus:outline-none
          disabled:cursor-not-allowed
          disabled:opacity-70
        `
            },

            variants: {
                variant: {
                    outline: `
            bg-[var(--ui-bg-elevated)]
            text-[var(--ui-text)]
            ring-1
            ring-[var(--ui-primary)]
            focus:ring-2
            focus:ring-[var(--ui-primary)]
          `,

                    solid: `
            bg-white
            border
            border-gray-200
            text-gray-900
          `
                }
            },

            defaults: {
                variant: 'outline'
            }
        },

        // TEXTAREA
        textarea: {
            slots: {
                base: `
          rounded-md
          bg-[var(--input-bg)]
          text-[var(--input-text)]
          placeholder:text-[var(--input-placeholder)]
          border
          border-[var(--input-border)]
          focus:border-[var(--input-border-focus)]
          focus:ring-1
          focus:ring-[var(--input-ring)]
        `
            }
        },

        // SELECT
        select: {
            slots: {
                // No Select, 'base' costuma ser o botão/trigger ou o select nativo
                base: `
          rounded-md
          bg-[var(--input-bg)]
          text-[var(--input-text)]
          border
          border-[var(--input-border)]
          focus:border-[var(--input-border-focus)]
          focus:ring-1
          focus:ring-[var(--input-ring)]
        `
            }
        },

        // BADGE
        badge: {
            // Classes estruturais comuns a todos os badges
            slots: {
                base: `
          rounded-full
          font-medium
          px-2.5
          py-1
          border
          text-xs
        `
            },

            // Variantes visuais (Cores e Estilos)
            variants: {
                color: {
                    success: `
            bg-[var(--status-success-bg)]
            text-[var(--status-success-text)]
            border-[var(--status-success-border)]
          `,
                    warning: `
            bg-[var(--status-warning-bg)]
            text-[var(--status-warning-text)]
            border-[var(--status-warning-border)]
          `,
                    error: `
            bg-[var(--status-error-bg)]
            text-[var(--status-error-text)]
            border-[var(--status-error-border)]
          `,
                    info: `
            bg-[var(--status-info-bg)]
            text-[var(--status-info-text)]
            border-[var(--status-info-border)]
          `
                }
            },

            // Definições padrão caso você não passe props no componente
            defaults: {
                size: 'sm',
                color: 'primary' // ou a cor que você preferir como padrão
            }
        },

        // ALERTS
        alert: {
            slots: {
                // 'root' é o container principal do alerta
                root: `
          rounded-lg
          border
          p-[var(--space-4)]
          flex
          gap-[var(--space-3)]
          items-start
        `,
                // Dica: Se precisar estilizar o texto, você pode usar:
                // title: 'font-bold ...',
                // description: 'text-sm ...'
            },

            variants: {
                color: {
                    success: `
            bg-[var(--status-success-bg)]
            text-[var(--status-success-text)]
            border-[var(--status-success-border)]
          `,
                    warning: `
            bg-[var(--status-warning-bg)]
            text-[var(--status-warning-text)]
            border-[var(--status-warning-border)]
          `,
                    error: `
            bg-[var(--status-error-bg)]
            text-[var(--status-error-text)]
            border-[var(--status-error-border)]
          `,
                    info: `
            bg-[var(--status-info-bg)]
            text-[var(--status-info-text)]
            border-[var(--status-info-border)]
          `
                }
            }
        }
    }
})